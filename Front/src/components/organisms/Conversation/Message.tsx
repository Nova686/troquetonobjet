import React, { useRef, useState } from "react";
import { MessageType } from "../../../typings/MessageType";
import { deleteMessage, editMessage } from "../../../services/messages";
import Avatar from "../../atoms/Avatar/Avatar";
import "./Message.css";  // Import du fichier CSS

type MessageProps = {
    message: MessageType;
    withAvatar: boolean;
    isCurrentUser: boolean;
};

export const Message: React.FC<MessageProps> = ({ message, withAvatar, isCurrentUser }) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const messageContentRef = useRef<HTMLDivElement | null>(null);

    const timestampFormat = (date: Date) => {
        const today = new Date();

        if (date.toLocaleString('fr', { dateStyle: 'short' }) === today.toLocaleString('fr', { dateStyle: 'short' })) {
            return `Aujourd'hui à ${date.toLocaleString('fr', { hour12: false, hour: "2-digit", minute: "2-digit" })}`;
        } else if (date.toLocaleString('fr', { dateStyle: 'short' }) === new Date(today.getTime() - 24 * 60 * 60 * 1000).toLocaleString('fr', { dateStyle: 'short' })) {
            return `Hier à ${date.toLocaleString('fr', { hour12: false, hour: "2-digit", minute: "2-digit" })}`;
        } else {
            return date.toLocaleString('fr', { hour12: false, dateStyle: "short", timeStyle: "short" });
        }
    }

    const editMessageAction = async (e: any) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            await saveEdit()
        } else if (messageContentRef && messageContentRef.current && e.keyCode === 27) {
            messageContentRef.current.innerText = message.content
            setIsEditable(false)
        }
    }

    const saveEdit = async () => {
        setIsEditable(false)
        if (!messageContentRef || !messageContentRef.current || messageContentRef.current.innerText === message.content) return;
        await editMessage(message.id, { content: messageContentRef.current.innerText })
    }

    const deleteMessageAction = async () => {
        await deleteMessage(message.id)
    }

    return (
        <div className={`message-container ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`message-item ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                {withAvatar ?
                    <Avatar url={null} size={12} />
                :
                    <div style={{ width: 48, height: 48 }}></div>
                }
                <div 
                    className="message-content-wrapper" 
                    onMouseEnter={() => setIsHover(true)} 
                    onMouseLeave={() => setIsHover(false)}
                >
                    <div key={message.id} className={`message-content ${isCurrentUser ? 'message-content-current-user' : 'message-content-other-user'} ${isEditable ? 'message-content-editable' : ''}`}>
                        <div contentEditable={isEditable} className="message-content-text" onKeyDown={editMessageAction} ref={messageContentRef}>
                            {message.content}
                        </div>
                        <div className={`message-timestamp ${isCurrentUser ? 'message-timestamp-current-user' : ''}`}>
                            {timestampFormat(message.createdAt)}{message.isUpdated && ' - modifié'}
                        </div>
                    </div>
                    {isHover && isCurrentUser &&
                        <div className="message-actions-wrapper">
                            {!isEditable ?
                                <>
                                    <div className="message-action message-action-edit" onClick={() => setIsEditable(!isEditable)}>
                                        Edit
                                    </div>
                                    <div className="message-action message-action-reply">
                                        Reply
                                    </div>
                                    <div className="message-action message-action-pin">
                                        Pin
                                    </div>
                                    <div className="message-action message-action-delete" onClick={deleteMessageAction}>
                                        Delete
                                    </div>
                                </>
                                :
                                <div className="message-action message-action-check" onClick={saveEdit}>
                                    Save
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Message;
