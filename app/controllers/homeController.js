const init = () => {
    return {
        get: (req, res) => {
            return res.status(200).send({
                'home': 'hello, this is the home page',
            });
        },
    };
};

module.exports = { init };
