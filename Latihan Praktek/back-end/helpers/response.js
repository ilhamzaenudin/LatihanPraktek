async function ok (values, message, reply) {
    return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(values);
}
async function datatable (draw, recordsTotal, values, message, reply) {
    return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            "draw" : draw,
            "recordsTotal" : recordsTotal,
            "recordsFiltered" : recordsTotal,
            "data" : values});
}
module.exports = {
    ok, datatable
}