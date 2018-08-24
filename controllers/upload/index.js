const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

function uploadHandler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    // `file` is the name of the <input> field of type `file`
    const old_path = files.file.path,
      file_size = files.file.size,
      file_ext = files.file.name.split('.').pop(),
      index = old_path.lastIndexOf('/') + 1,
      file_name = old_path.substr(index),
      new_path = path.join(
        process.env.PWD,
        '/uploads/',
        `${file_name}.${file_ext}`
      );

    fs.readFile(old_path, (error, data) => {
      if (error) throw error;
      fs.writeFile(new_path, data, (writeErr) => {
        if (writeErr) throw writeErr;
        fs.unlink(old_path, (unlinkErr) => {
          if (unlinkErr) throw unlinkErr;
          if (err) {
            res.status(500);
            res.json({ success: false });
          } else {
            res.status(200);
            res.json({ success: true });
          }
        });
      });
    });
  });
}
