import { ConversationType } from '../../../typings/ConversationType';
import './Conversation.css';

type ConversationProps = {
    conversation: ConversationType;
    isSelected: boolean;
};

const Conversation: React.FC<ConversationProps> = ({ conversation, isSelected }) => {
    const changeConversation = (conversation: any) => {
        console.log(conversation);
    }
    return (
        <div className={`conversation-container ${isSelected ? "selected" : "unselected"}`}
             onClick={() => changeConversation(conversation)}>
            <div className="text">{conversation.buyer.name}</div>
        </div>
    );
};

export default Conversation;
