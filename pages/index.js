export default function Home() {
	const [session, loading] = useSession()
	return (
		<>
			<form action="api/create" >
				<input type="text" name="username"></input>
				<input type="text" name="password"></input>
			</form>
		</>
	)
}