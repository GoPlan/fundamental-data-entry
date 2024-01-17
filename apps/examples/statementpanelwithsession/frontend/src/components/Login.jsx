import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import {useContext, useRef} from "react";
import {AppContext} from "./AppContext";


export default function Login() {

    const appCtx = useContext(AppContext)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    const formSubmitHandle = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("username", usernameRef.current.value)
        formData.append("password", passwordRef.current.value)


        fetch(appCtx.oauth2.tokenURL, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(doc => {
                if ("access_token" in doc) {
                    appCtx.jwt.setToken(doc)
                }
            })
            .catch(err => console.log(err))
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