import { Input, Button } from '@material-ui/core';


export default function Login() {
	//const [session, loading] = useSession()
	var username = ""
	var password = ""
    return(
		<>
			<form style={{
				alignContent: "center"
			}}>
				<Input placeholder="username" id="username" onChange={(event) => {
					username = event.target.value
				}}>Email address</Input>
				<Input id="password" aria-describedby="my-helper-text"  placeholder="password" onChange={(event) => {
					password = event.target.value
				}}/>
				<Button onClick={() => {
				if(username === "" || password === "") {
					alert("no username or password" + username + password);
				} else {

					fetch("/api/login", {
						method: "POST",
						body: JSON.stringify({
							username: username,
							password: password
						})
					})
					.then(response => {
						response.json().then(json => {
							if()
						})
					})
				}
			}}>Submit</Button>
			</form>
		</>
    )
}