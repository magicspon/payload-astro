import { AcceptTeamInvite } from '@/components/users/AcceptTeamInvite'

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	return (
		<div>
			<h1>Invitation</h1>
			<AcceptTeamInvite id={id} />
		</div>
	)
}
