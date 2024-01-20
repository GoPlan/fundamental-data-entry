import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import {useRef} from "react";


export default function Login({signIn}) {

    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    const formSubmitHandle = (e) => {
        e.preventDefault()

        const username = usernameRef.current.value
        const password = passwordRef.current.value

        signIn(username, password)
    }

    return (
        <Form onSubmit={formSubmitHandle}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control ref={usernameRef} name="username" type="text"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control ref={passwordRef} name="password" type="password"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Log-in
            </Button>
        </Form>
    )
}