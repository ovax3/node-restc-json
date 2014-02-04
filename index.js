var formatter = function (options, next) {
  var data = options.data;
  if (data) {
    options.data = JSON.stringify(data);
  }
  return next();
};

var parser = function (req, res, next) {
  var data = res.data;
  if (data) {
    try {
      res.data = JSON.parse(data);
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

