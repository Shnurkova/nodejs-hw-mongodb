

function notFoundHandler(_, res,) {
    res.status(404).json({
    status: 404,
    message: "Not found"
    });
}

export { notFoundHandler };
