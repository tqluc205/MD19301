router.post("/send-mail", async function (req, res, next) {
    try {
        const { to, subject, content } = req.body;

        const mailOptions = {
            from: 'luctqps38844@gmail.com',
            to: "tranphuongnam123lic@gmail.com",
            subject: 'nnn',
            html: 'mmmm'
        };

        await sendMail.transporter.sendMail(mailOptions);

        res.json({ status: 1, message: "Gửi mail thành công" });
    } catch (err) {
        res.json({ status: 0, message: "Gửi mail thất bại" });
    }
});
