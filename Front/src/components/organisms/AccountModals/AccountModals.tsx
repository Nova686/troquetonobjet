import { AvatarSelectionModal, EditAccountModal } from "../../molecules";

interface Props {
	editModalOpen: boolean;
	setEditModalOpen: (val: boolean) => void;
	onEditAccount: (username: string, phone: string) => void;
	avatarsModalOpen: boolean;
	setAvatarsModalOpen: (val: boolean) => void;
	onEditAvatar: (selectedAvatar: number) => void;
	loading: boolean;
	user: { username: string; phone?: string | null; avatar?: number } | null;
}

const AccountModals = ({
	editModalOpen,
	setEditModalOpen,
	onEditAccount,
	avatarsModalOpen,
	setAvatarsModalOpen,
	onEditAvatar,
	loading,
	user
}: Props) => (
	<>
		<EditAccountModal
			open={editModalOpen}
			onClose={() => setEditModalOpen(false)}
			username={user?.username ?? ""}
			phone={user?.phone}
			onEdit={onEditAccount}
			loading={loading}
		/>
		<AvatarSelectionModal
			open={avatarsModalOpen}
			onClose={() => setAvatarsModalOpen(false)}
			onEdit={onEditAvatar}
			initSelected={user?.avatar ?? 1}
			loading={loading}
		/>
	</>
);

export default AccountModals;