import { FC } from 'react';
import { ConversationType } from '../../../typings/ConversationType';
import './Conversation.css';
import { dateFormat } from '../../../services/FormatterService';
import { useAuth } from '../../../contexts/AuthContext';

type ConversationProps = {
    conversation: ConversationType;
    isSelected: boolean;
    onClick: (conversation: ConversationType) => void;
};

const Conversation: FC<ConversationProps> = ({ conversation, isSelected, onClick }) => {
    const { user } = useAuth();

    return (
        <div className={`conversation-container ${isSelected ? "conversation-selected" : "conversation-unselected"}`}
             onClick={() => onClick(conversation)}>
            <div className="conversation-wrapper">
                <div className="conversation-user">{user && user.id === conversation.buyer.id ? conversation.seller.name : conversation.buyer.name}</div>
                {conversation.lastMessage &&
                    <div>
                        <div style={{ fontSize: '0.75rem' }}>{ conversation.lastMessage.content }</div>
                        <div style={{ fontSize: '0.6rem' }}>Dernier message le {dateFormat(conversation.lastMessage.createdAt)}</div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Conversation;
