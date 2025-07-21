import { SendHorizontal, Smile } from 'lucide-react';
import { Image } from './Image';
import { useEffect, useRef, useState } from 'react';
import { emojis } from '@/data/emojis';
import { cn } from '@/lib/utils';

interface CommentEditorProps {
    parentId?: string;
    replyId?: string;
    replyName?: string;
    isEdit?: boolean;
    text?: string;
}

export function CommentEditor({ parentId, replyId, replyName, isEdit, text }: CommentEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const isReplying = !!parentId && !!replyId;
    const [showEmojis, setShowEmojis] = useState(false);
    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    const placeholder = !!parentId ? 'Reply...' : 'Write a comment...';

    // Initialize editor content
    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        editor.innerHTML = '';

        if (isEdit && text) {
            const mentionRegex = /<@(\w+)>/g;
            let lastIndex = 0;
            let match;

            while ((match = mentionRegex.exec(text)) !== null) {
                const [fullMatch, userId] = match;
                const start = match.index;

                // Add text before the mention
                if (start > lastIndex) {
                    const textNode = document.createTextNode(text.slice(lastIndex, start));
                    editor.appendChild(textNode);
                }

                // Add mention span (replace with replyName if matched)
                if (userId === replyId) {
                    const mentionSpan = document.createElement('span');
                    mentionSpan.textContent = `@${replyName}`;
                    mentionSpan.contentEditable = 'false';
                    mentionSpan.className = ' bg-neutral-300/20 px-1 rounded cursor-default';
                    mentionSpan.dataset.mentionId = userId;
                    editor.appendChild(mentionSpan);
                } else {
                    // If not matching replyId, render raw text like "<@userId>"
                    editor.appendChild(document.createTextNode(fullMatch));
                }

                lastIndex = start + fullMatch.length;
            }

            // Add remaining text
            if (lastIndex < text.length) {
                editor.appendChild(document.createTextNode(text.slice(lastIndex)));
            } else {
                // If mention is at the end, insert invisible space so caret doesn't jump
                const zwsp = document.createTextNode('\u200B');
                const space = document.createTextNode('\u00A0');
                editor.appendChild(zwsp);
                editor.appendChild(space);
            }

            placeCursorAtEnd(editor);
            handleInput();
            return;
        }

        // Reply mode (not editing)
        if (isReplying) {
            const mentionSpan = document.createElement('span');
            mentionSpan.textContent = `@${replyName}`;
            mentionSpan.contentEditable = 'false';
            mentionSpan.className = ' bg-neutral-300/20 px-1 rounded cursor-default';
            mentionSpan.dataset.mentionId = replyId;

            const zwsp = document.createTextNode('\u200B');
            const space = document.createTextNode('\u00A0');

            editor.appendChild(mentionSpan);
            editor.appendChild(zwsp);
            editor.appendChild(space);
            placeCursorAtEnd(editor);
        }

        if (!!parentId) editor.focus();
        handleInput();
    }, [isEdit, text, isReplying, replyName, replyId, parentId]);

    // Utility functions
    function placeCursorAtEnd(el: HTMLElement) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(range);
    }

    function getCaretPosition(element: HTMLElement): number {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return 0;

        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        return preCaretRange.toString().length;
    }

    function getElementPosition(element: HTMLElement, container: HTMLElement): number {
        const range = document.createRange();
        range.selectNodeContents(container);
        range.setEnd(element, 0);
        return range.toString().length;
    }

    function getTextBetweenPositions(element: HTMLElement, start: number, end: number): string {
        const text = element.innerText || element.textContent || '';
        return text.substring(start, end);
    }

    // Content management
    function insertEmoji(emoji: string) {
        const editor = editorRef.current;
        if (!editor) return;

        editor.focus();
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(emoji));

        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        handleInput();
    }

    function removeMention(mentionElement: Element) {
        mentionElement.remove();
        handleInput();
    }

    function handleArrowNavigation(e: React.KeyboardEvent) {
        const editor = editorRef.current;
        if (!editor) return;

        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const isLeftArrow = e.key === 'ArrowLeft';
        const isRightArrow = e.key === 'ArrowRight';

        if (isLeftArrow) {
            // Moving left
            if (range.collapsed && range.startOffset === 0 && range.startContainer.nodeType === Node.TEXT_NODE) {
                const textNode = range.startContainer as Text;
                const prevSibling = textNode.previousSibling;

                if (prevSibling && prevSibling.nodeType === Node.ELEMENT_NODE) {
                    const element = prevSibling as Element;
                    if (element.hasAttribute('data-mention-id')) {
                        e.preventDefault();
                        // Place cursor before the mention
                        const newRange = document.createRange();
                        newRange.setStartBefore(prevSibling);
                        newRange.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(newRange);
                        return;
                    }
                }
            }

            // Handle cursor at the beginning of editor
            if (range.collapsed && range.startContainer === editor && range.startOffset === 0) {
                // Already at the beginning, let default behavior handle it
                return;
            }

            // Handle cursor right after a mention
            if (range.collapsed && range.startContainer === editor) {
                const offset = range.startOffset;
                if (offset > 0) {
                    const prevNode = editor.childNodes[offset - 1];
                    if (prevNode && prevNode.nodeType === Node.ELEMENT_NODE) {
                        const element = prevNode as Element;
                        if (element.hasAttribute('data-mention-id')) {
                            e.preventDefault();
                            // Place cursor before the mention
                            const newRange = document.createRange();
                            newRange.setStartBefore(prevNode);
                            newRange.collapse(true);
                            selection.removeAllRanges();
                            selection.addRange(newRange);
                            return;
                        }
                    }
                }
            }
        }

        if (isRightArrow) {
            // Moving right
            if (range.collapsed && range.startContainer === editor) {
                const offset = range.startOffset;
                if (offset < editor.childNodes.length) {
                    const nextNode = editor.childNodes[offset];
                    if (nextNode && nextNode.nodeType === Node.ELEMENT_NODE) {
                        const element = nextNode as Element;
                        if (element.hasAttribute('data-mention-id')) {
                            e.preventDefault();
                            // Place cursor after the mention
                            const newRange = document.createRange();
                            newRange.setStartAfter(nextNode);
                            newRange.collapse(true);
                            selection.removeAllRanges();
                            selection.addRange(newRange);
                            return;
                        }
                    }
                }
            }

            // Handle cursor at the end of text node before mention
            if (range.collapsed && range.startContainer.nodeType === Node.TEXT_NODE) {
                const textNode = range.startContainer as Text;
                const textLength = textNode.textContent?.length || 0;

                if (range.startOffset === textLength) {
                    const nextSibling = textNode.nextSibling;
                    if (nextSibling && nextSibling.nodeType === Node.ELEMENT_NODE) {
                        const element = nextSibling as Element;
                        if (element.hasAttribute('data-mention-id')) {
                            e.preventDefault();
                            // Place cursor after the mention
                            const newRange = document.createRange();
                            newRange.setStartAfter(nextSibling);
                            newRange.collapse(true);
                            selection.removeAllRanges();
                            selection.addRange(newRange);
                            return;
                        }
                    }
                }
            }
        }
    }

    // Event handlers
    function handleKeyDown(e: React.KeyboardEvent) {
        const editor = editorRef.current;
        if (!editor) return;

        // Handle arrow key navigation around mentions
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            handleArrowNavigation(e);
            return;
        }

        if (e.key !== 'Backspace') return;

        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        if (!range.collapsed) return;

        // Case 1: Cursor in text node
        if (range.startContainer.nodeType === Node.TEXT_NODE) {
            const textNode = range.startContainer as Text;

            if (range.startOffset === 0) {
                const prevSibling = textNode.previousSibling;
                if (prevSibling?.nodeType === Node.ELEMENT_NODE) {
                    const element = prevSibling as Element;
                    if (element.hasAttribute('data-mention-id')) {
                        e.preventDefault();
                        removeMention(element);
                        return;
                    }
                }
            }
        }

        // Case 2: Cursor in editor element
        else if (range.startContainer === editor) {
            const offset = range.startOffset;
            if (offset > 0) {
                const prevNode = editor.childNodes[offset - 1];
                if (prevNode?.nodeType === Node.ELEMENT_NODE) {
                    const element = prevNode as Element;
                    if (element.hasAttribute('data-mention-id')) {
                        e.preventDefault();
                        removeMention(element);
                        return;
                    }
                }
            }
        }

        // Case 3: Find nearest mention before cursor
        const mentionElements = editor.querySelectorAll('[data-mention-id]');
        if (mentionElements.length === 0) return;

        const caretPosition = getCaretPosition(editor);
        let lastMentionBeforeCaret: any = null;

        mentionElements.forEach((mention) => {
            const mentionEl = mention as HTMLElement;
            const mentionPosition = getElementPosition(mentionEl, editor);
            if (mentionPosition < caretPosition) {
                lastMentionBeforeCaret = mentionEl;
            }
        });

        if (lastMentionBeforeCaret) {
            const mentionEnd = getElementPosition(lastMentionBeforeCaret, editor) + (lastMentionBeforeCaret.textContent?.length || 0);
            const textBetween = getTextBetweenPositions(editor, mentionEnd, caretPosition);

            if (textBetween.trim() === '' || textBetween === '\u200B') {
                e.preventDefault();
                removeMention(lastMentionBeforeCaret);
                placeCursorAtEnd(editor);
            }
        }
    }

    function handleInput() {
        const editor = editorRef.current;
        if (!editor) return;

        const textContent = editor.innerText.replace(/\u200B/g, '').trim();

        // Filter meaningful content nodes
        const meaningfulNodes = Array.from(editor.childNodes).filter((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent ?? '';
                return text.replace(/\u200B/g, '').trim().length > 0;
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node as Element;
                if (el.hasAttribute('data-mention-id')) return true;

                const text = el.textContent ?? '';
                return text.replace(/\u200B/g, '').trim().length > 0;
            }

            return false;
        });

        const onlyMention = meaningfulNodes.length === 1 && meaningfulNodes[0] instanceof Element && meaningfulNodes[0].hasAttribute('data-mention-id');

        const hasMeaningfulText = textContent.length > 0;

        // Update states
        setCanSubmit(hasMeaningfulText && !onlyMention);

        // Update placeholder
        editor.setAttribute('data-placeholder', hasMeaningfulText ? '' : placeholder);
    }

    function handleSubmit() {
        const editor = editorRef.current;
        if (!editor || !canSubmit) return;

        let plainText = '';

        editor.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                plainText += node.textContent ?? '';
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                if (element.hasAttribute('data-mention-id')) {
                    const mentionId = element.getAttribute('data-mention-id')!;
                    plainText += `<@${mentionId}>`;
                } else {
                    plainText += element.innerText;
                }
            }
        });

        const trimmedText = plainText.trim();
        const mention = editor.querySelector('[data-mention-id]');
        const replyToId = mention?.getAttribute('data-mention-id') ?? null;

        console.log('Submitted content:', trimmedText);
        console.log('Is reply?', !!replyToId);
        console.log('Reply to ID:', replyToId);
        console.log('Parent ID:', parentId);
    }

    return (
        <div className=" flex items-start justify-between gap-3">
            <div className=" w-12">
                <Image src="https://image.knite.online/1q_7fW7cRI4EaYVfgsJ-PAimpMwnGrT5Z=s100" alt="Avatar" className="rounded-full" />
            </div>

            <div className=" relative flex-1 bg-white/20 p-3 xs:p-4 rounded-2xl shadow w-0 text-sm">
                <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    data-placeholder=""
                    className="pb-2 min-h-[2rem] focus:outline-none cursor-text max-w-full overflow-auto break-words relative before:absolute before:text-gray-400 before:opacity-50 before:pointer-events-none before:select-none before:content-[attr(data-placeholder)] empty:before:block"
                />
                <div className="flex items-center justify-between">
                    <button onClick={() => setShowEmojis((prev) => !prev)}>
                        <Smile size={20} />
                    </button>
                    <button onClick={handleSubmit} className={cn(!canSubmit && 'text-neutral-500')}>
                        <SendHorizontal size={20} />
                    </button>
                </div>
                {showEmojis && (
                    <div className="absolute bottom-full mb-2 bg-white shadow-md p-2 rounded grid grid-cols-6 xs:grid-cols-9 sm:grid-cols-12 md:grid-cols-18 lg:grid-cols-12 xl:grid-cols-18 gap-1 z-10">
                        {emojis.map((emoji, index) => (
                            <button key={index} className="text-xl hover:bg-gray-100 rounded p-1" onClick={() => insertEmoji(emoji)}>
                                {emoji}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
