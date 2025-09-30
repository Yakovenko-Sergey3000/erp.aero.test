class File {
  constructor({
    id,
    user_id,
    name,
    extension,
    mime_type,
    size,
    uploaded_at,
    path,
  } = {}) {
    if (id) {
      this.id = id;
    }
    this.user_id = user_id;
    this.name = name;
    this.extension = extension;
    this.mime_type = mime_type;
    this.size = size;
    this.uploaded_at = uploaded_at;
    this.path = path;
  }

  static tableName = "files";
}

export default File;
