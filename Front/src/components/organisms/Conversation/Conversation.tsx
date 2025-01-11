import { ConversationType } from '../../../typings/ConversationType';
import './Conversation.css';

type ConversationProps = {
    conversation: ConversationType;
    isSelected: boolean;
    onClick: (conversation: ConversationType) => void;
};

const Conversation: React.FC<ConversationProps> = ({ conversation, isSelected, onClick }) => {
    const formatDate = (date: string): string => {
        return new Date(date).toLocaleString("fr", { 
            hour12: false, 
            dateStyle: "short", 
            timeStyle: "short" 
        }).replace(' ', ' à ')
    }

    return (
        <div className={`conversation-container ${isSelected ? "conversation-selected" : "conversation-unselected"}`}
             onClick={() => onClick(conversation)}>
            <div className="conversation-wrapper">
                <div className="conversation-user">{conversation.buyer.name}</div>
                {conversation.lastMessage &&
                    <div>
                        <div style={{ fontSize: '0.75rem' }}>{ conversation.lastMessage.content }</div>
                        <div style={{ fontSize: '0.6rem' }}>Dernier message le {formatDate(conversation.lastMessage.createdAt)}</div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Conversation;
