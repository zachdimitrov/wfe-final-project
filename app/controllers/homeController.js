const init = () => {
    return {
        // home message
        getHome: (req, res) => {
            return res.status(200).send({
                'home': 'hello, this is the home page',
            });
        },
    };
};

module.exports = { init };
