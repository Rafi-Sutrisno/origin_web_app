import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);
// cek dulu apakah User telah ada di models baru jika tidak ada maka buat, karena ini akan dipanggil terus terusan jika ada koneksi baru

export default User;
