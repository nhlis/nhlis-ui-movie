import { ChevronDown, EllipsisVertical, Heart, ThumbsDown, Mars } from 'lucide-react';
import { Image } from './Image';

interface CommentViewProps {
    text: string;
    parentId?: string;
    replyId?: string;
    replyName?: string;
}

export function CommentView({ text, replyId, replyName }: CommentViewProps) {
    const parts = text.split(/(<@\w+>)/g);

    return (
        <>
            <div className=" flex items-start justify-between gap-3">
                <div className=" w-12">
                    <Image src="https://image.knite.online/1q_7fW7cRI4EaYVfgsJ-PAimpMwnGrT5Z=s100" alt="Avatar" className="rounded-full" />
                </div>
                <div className=" relative flex-1 bg-white/20rounded-2xl shadow w-0 space-y-2">
                    <div className=" flex items-center justify-between">
                        <div className=" flex items-center gap-2">
                            <h4 className=" font-semibold">@Levi</h4>
                            <Mars size={15} stroke="blue" />
                            <span className=" font-light text-xs text-neutral-400">9 days ago</span>
                        </div>
                        <div>
                            <EllipsisVertical size={20} />
                        </div>
                    </div>
                    <div className=" text-sm">
                        {parts.map((part, index) => {
                            const mentionMatch = part.match(/^<@(\w+)>$/);

                            if (mentionMatch) {
                                const mentionedId = mentionMatch[1];

                                if (mentionedId === replyId && replyName) {
                                    return (
                                        <span key={index} className=" bg-neutral-300/20 px-1 rounded">
                                            @{replyName}
                                        </span>
                                    );
                                } else {
                                    return <span key={index}>{part}</span>;
                                }
                            }

                            return <span key={index}>{part}</span>;
                        })}
                    </div>
                    <div className=" flex gap-5 items-center justify-start">
                        <button className=" flex items-center justify-start gap-1 cursor-pointer">
                            <Heart size={20} />1
                        </button>
                        <button className=" flex items-center justify-start gap-1 cursor-pointer">
                            <ThumbsDown size={20} />1
                        </button>
                        <button className=" text-sm font-semibold px-4 py-2 hover:bg-neutral-600 rounded-full cursor-pointer">Reply</button>
                    </div>
                    <button className=" flex items-center justify-start gap-1 text-sm font-medium px-4 py-1 text-purple-400 hover:bg-neutral-600 rounded-full cursor-pointer">
                        <ChevronDown size={20} />
                        <span>1 Reply</span>
                    </button>
                </div>
            </div>
        </>
    );
}
