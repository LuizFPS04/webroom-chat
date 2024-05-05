module.exports.startChat = (app, req, res) => {
    const data = req.body;

    req.assert("apelido", "Nome ou apelido é obrigatório").notEmpty();
    req.assert("apelido", "Nome ou apelido deve ter entre 3 a 15 caracteres").len(3, 15);

    const errors = req.validationErrors();

    if (errors) {
        res.render("index", { validation: errors });
        return;
    }

    app.get("io").emit("message",
        { apelido: data.apelido, message: " acabou de entrar no chat" }
    );

    res.render("chat", { data: data });
}