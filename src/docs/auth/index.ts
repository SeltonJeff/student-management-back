const paths = {
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Auth",
      description: "Post for Login",
      parameters: [
        {
          in: "body",
          name: "Login payload",
          schema: {
            $ref: "#/definitions/LoginPayload",
          },
        },
      ],
      responses: {
        200: {
          description: "OK",
          schema: {
            $ref: "#/definitions/Login",
          },
        },
        401: {
          description: "Invalid credentials",
          schema: {
            $ref: "#/definitions/ErrorResponse",
          },
        },
        403: {
          description: "Invalid client",
          schema: {
            $ref: "#/definitions/ErrorResponse",
          },
        },
      },
    },
  },
};

const definitions = {
  Login: {
    type: "object",
    properties: {
      data: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" },
            },
          },
          access_token: { type: "string" },
          refresh_token: { type: "string" },
        },
      },
    },
  },
  LoginPayload: {
    type: "object",
    properties: {
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
  },
};

export default {
  paths,
  definitions,
};
