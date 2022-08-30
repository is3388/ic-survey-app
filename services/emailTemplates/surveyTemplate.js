module.exports = (survey) => {
    return `
        <html>
            <body>
                <div style='text-align:center;'>
                    <h3>
                        We value your input!
                    </h3>
                    <p>
                        Please give us feedback on our services by answering the question below.
                    </p>
                    <p>
                        ${survey.body}
                    </p>
                    <div>
                        <a href='http://localhost:3000'>Yes</a>
                    </div>
                    <div>
                        <a href='http://localhost:3000'>No</a>
                    </div>
                </div>
            </body>
        </html>`
}