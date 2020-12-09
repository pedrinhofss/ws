import { Input, Button } from '@material-ui/core';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export default function Home() {
	var token = cookies.get('token') || null
	return (
		<>

		</>
	)
}

export async function getStaticProps(context) {




    const res = await fetch("/api/")
    const data = await res.json()
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {}, // will be passed to the page component as props
    }
  }