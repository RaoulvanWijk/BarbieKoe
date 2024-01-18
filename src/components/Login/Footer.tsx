import '/resources/styles/components/login/footer.scss'

type FooterProps = {
    loginActive: boolean,
    setLoginActive: (active: boolean) => void | null,
}

export default function Footer(FooterProps: FooterProps) {
    return (
        <footer className="login-footer">
            <button onClick={() => FooterProps.setLoginActive(false)} className={'back-button ' + (FooterProps.loginActive ? 'visible' : "")}>Terug</button>
            <button className='help-button'>
                Help
            </button>
        </footer>
    )
}
