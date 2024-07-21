

function notFoundHandler(_, res,) {
    res.status(404).json({
    status: 400,
    message: "Not found"
    });
}

export { notFoundHandler };
