export const UserHttp = {
  BASE_URL: "http://localhost:5000/api/users",

  async checkExistingUser(email: string | undefined) {
    try {
      const response = await fetch(`${this.BASE_URL}/checkExistingEmail`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  },

  async createUser(data: any, sendRequest: any) {
    const formData: any = new FormData();
    formData.append("email", data.email);
    formData.append("name", data.nickName);
    formData.append("password", data.password);
    formData.append("image", data.image ? data.image[0] : undefined);

    return await sendRequest(`${this.BASE_URL}/signup`, "POST", formData);
  },
};
