const paths = {
  "/student   (listing)": {
    get: {
      tags: ["Student"],
      summary: "Student",
      description: "Get student list",
      responses: {
        200: {
          description: "List students",
          schema: {
            $ref: "#/definitions/StudentList",
          },
        },
        401: {
          description: "Invalid access_token",
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
  "/student   (new)": {
    post: {
      tags: ["Student"],
      summary: "Student",
      description: "New student",
      parameters: [
        {
          in: "body",
          name: "New student payload",
          schema: {
            $ref: "#/definitions/NewStudentPayload",
          },
        },
      ],
      responses: {
        200: {
          description: "Student created",
          schema: {
            $ref: "#/definitions/StudentCreated",
          },
        },
        401: {
          description: "Invalid access_token",
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
  "/student/{query}   (listing with search)": {
    get: {
      tags: ["Student"],
      summary: "Student",
      description: "List students by query",
      responses: {
        200: {
          description: "List students by query",
          schema: {
            $ref: "#/definitions/StudentList",
          },
        },
        401: {
          description: "Invalid access_token",
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
  "/student/{_id}   (update)": {
    patch: {
      tags: ["Student"],
      summary: "Student",
      description: "Update student",
      parameters: [
        {
          in: "body",
          name: "Update payload",
          schema: {
            $ref: "#/definitions/NewStudentPayload",
          },
        },
      ],
      responses: {
        200: {
          description: "Student updated",
          schema: {
            $ref: "#/definitions/StudentCreated",
          },
        },
        401: {
          description: "Invalid access_token",
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
  "/student/{_id}   (delete)": {
    delete: {
      tags: ["Student"],
      summary: "Student",
      description: "Delete student",
      responses: {
        201: {
          description: "Student updated",
          schema: {
            $ref: "#/definitions/StudentDeleted",
          },
        },
        401: {
          description: "Invalid access_token",
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
  StudentList: {
    type: "array",
    items: {
      $ref: "#/definitions/Student",
    },
  },
  Student: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
      createdAt: {
        type: "string",
      },
      updatedAt: {
        type: "string",
      },
      ra: {
        type: "string",
      },
      name: {
        type: "string",
      },
      email: {
        type: "string",
      },
      cpf: {
        type: "string",
      },
    },
  },
  NewStudentPayload: {
    type: "object",
    properties: {
      ra: {
        type: "string",
      },
      name: {
        type: "string",
      },
      email: {
        type: "string",
      },
      cpf: {
        type: "string",
      },
    },
  },
  StudentCreated: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
    },
  },
  StudentDeleted: {
    type: "object",
    properties: {
      message: { type: "string" },
    },
  },
};

export default {
  paths,
  definitions,
};
