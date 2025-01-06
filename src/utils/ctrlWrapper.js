const ctrlWrapper = (ctrl) => (req, res, next) => {
    ctrl(req, res).catch(next);
};

module.exports = { ctrlWrapper };
