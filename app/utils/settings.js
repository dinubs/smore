import fs from 'fs';
import path from 'path';

export function get_settings(cb) {
  fs.readFile(path.join(global.__dirname, 'settings.json'), (err, file) => {
    let settings = JSON.parse(file.toString());
    cb(settings);
  });
}

export function set_settings(settings, cb) {
  fs.writeFile(path.join(global.__dirname, 'settings.json'), JSON.stringify(settings), (err) => {
    cb(err);
  });
}