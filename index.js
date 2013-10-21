var formatter = function (options, next) {
  var data = options.data;
  if (data) {
    options.body = JSON.stringify(data);
  }
  return next();
};

var parser = function (req, res, next) {
  var body = res.body;
  if (body) {
    try {
      res.data = JSON.parse(res.body);
    } catch (e) { }
  }
  return next();
};

module.exports = {
  before: formatter,
  after: parser,
  formatter: {
    before: formatter
  },
  parser: {
    after: parser
  }
};

