exports.api = function(req, res) {
    res.json({
      resources: [
        {
          resource: "fossils",
          verbs: ["GET", "POST", "PUT", "DELETE"]
        }
      ]
    });
  };
  