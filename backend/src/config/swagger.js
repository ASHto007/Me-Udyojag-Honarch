/**
 * OpenAPI 3.0 Specification for Mi Udyojak Honarach REST API
 */
export const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Mi Udyojak Honarach REST API',
    version: '1.0.0',
    description:
      'Production-grade RESTful API documentation for the Mi Udyojak Honarach (मी उद्योजक होणारच) full-stack web platform.\n\nHandles membership enquiries, event participant registrations, duplicate protection, and automated notifications.',
    contact: {
      name: 'Mi Udyojak Honarach Support',
      email: 'miudyojakhonarch@gmail.com',
      url: 'https://miudyojakhonarach.com',
    },
    license: {
      name: 'MIT',
    },
  },
  servers: [
    {
      url: '/api',
      description: 'Current Environment API Server',
    },
    {
      url: 'http://localhost:5000/api',
      description: 'Local Development Server',
    },
  ],
  tags: [
    {
      name: 'System Health',
      description: 'Application liveness and database diagnostic endpoints',
    },
    {
      name: 'Enquiries',
      description: 'General membership and business inquiry submission and retrieval',
    },
    {
      name: 'Event Registrations',
      description: 'Participant conclave registration and duplicate validation',
    },
  ],
  paths: {
    '/health': {
      get: {
        summary: 'System health check and database diagnostic',
        description: 'Returns API operational status, server uptime, and active MongoDB connection status.',
        tags: ['System Health'],
        responses: {
          200: {
            description: 'API and database are healthy and operational.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/HealthResponse',
                },
              },
            },
          },
          503: {
            description: 'Service unavailable or database disconnected.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/enquiries': {
      post: {
        summary: 'Submit a new business or membership enquiry',
        description:
          'Submits an inquiry from the public website. Sanitizes input, saves to MongoDB, and triggers admin/applicant confirmation emails.',
        tags: ['Enquiries'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/EnquiryInput',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Enquiry received and stored successfully.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/EnquirySuccessResponse',
                },
              },
            },
          },
          400: {
            description: 'Validation failed on required fields or input formats.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ValidationErrorResponse',
                },
              },
            },
          },
          429: {
            description: 'Rate limit exceeded (too many submissions from this IP).',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      get: {
        summary: 'List enquiries (Administrative pagination)',
        description: 'Retrieves a paginated list of submitted enquiries sorted by latest first.',
        tags: ['Enquiries'],
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Page number for pagination (defaults to 1)',
            schema: {
              type: 'integer',
              default: 1,
            },
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Number of items per page (defaults to 20, max 100)',
            schema: {
              type: 'integer',
              default: 20,
            },
          },
        ],
        responses: {
          200: {
            description: 'List of enquiries retrieved successfully.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/EnquiryListResponse',
                },
              },
            },
          },
        },
      },
    },
    '/event-registrations': {
      post: {
        summary: 'Register for an upcoming conclave or workshop event',
        description:
          'Registers a participant for a specific event. Enforces unique constraint per event and email/phone, preventing duplicate sign-ups.',
        tags: ['Event Registrations'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/EventRegistrationInput',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Participant registration confirmed successfully.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/EventRegistrationSuccessResponse',
                },
              },
            },
          },
          400: {
            description: 'Validation error in submitted fields.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ValidationErrorResponse',
                },
              },
            },
          },
          429: {
            description: 'Rate limit exceeded.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      get: {
        summary: 'List event registrations (Administrative pagination)',
        description: 'Retrieves a paginated list of event registrations with optional filtering by eventId.',
        tags: ['Event Registrations'],
        parameters: [
          {
            name: 'eventId',
            in: 'query',
            description: 'Filter registrations by specific event identifier',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'page',
            in: 'query',
            description: 'Page number (default 1)',
            schema: {
              type: 'integer',
              default: 1,
            },
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Number of items per page (default 20)',
            schema: {
              type: 'integer',
              default: 20,
            },
          },
        ],
        responses: {
          200: {
            description: 'List of event registrations retrieved successfully.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/EventRegistrationListResponse',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      HealthResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'ok' },
          timestamp: { type: 'string', format: 'date-time', example: '2026-10-06T14:03:40.292Z' },
          uptime: { type: 'number', example: 124.52 },
          database: {
            type: 'object',
            properties: {
              status: { type: 'string', example: 'connected' },
              connected: { type: 'boolean', example: true },
            },
          },
        },
      },
      EnquiryInput: {
        type: 'object',
        required: ['fullName', 'email', 'phone', 'city', 'consent'],
        properties: {
          fullName: {
            type: 'string',
            minLength: 2,
            maxLength: 100,
            example: 'Santosh Patil',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'santosh.patil@example.com',
          },
          phone: {
            type: 'string',
            example: '9822012345',
            description: '10-digit Indian mobile number or with +91 prefix',
          },
          city: {
            type: 'string',
            minLength: 2,
            maxLength: 100,
            example: 'Kolhapur',
          },
          stage: {
            type: 'string',
            enum: [
              'Aspiring Entrepreneur (Idea Stage)',
              'Early Stage Venture',
              'Established MSME looking to scale',
              'Student / Exploring Entrepreneurship',
            ],
            example: 'Early Stage Venture',
          },
          interest: {
            type: 'string',
            enum: [
              'Orientation & Fundamentals (Service 01)',
              'Step-by-Step Training (Service 02)',
              'Mentorship & Guidance (Service 03)',
              'Events & Conclaves (Service 04)',
              'Community & Networking (Service 05)',
              'Other',
            ],
            example: 'Mentorship & Guidance (Service 03)',
          },
          message: {
            type: 'string',
            maxLength: 2000,
            example: 'Looking for guidance on scaling manufacturing operations across Maharashtra.',
          },
          consent: {
            type: 'boolean',
            example: true,
            description: 'Must be true to authorize communication.',
          },
        },
      },
      EnquirySuccessResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: {
            type: 'string',
            example: 'Your enquiry has been received successfully. Our team will contact you shortly.',
          },
          data: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '6ac4fdceaff2b0c71491699f' },
              fullName: { type: 'string', example: 'Santosh Patil' },
              email: { type: 'string', example: 'santosh.patil@example.com' },
              createdAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
      EnquiryListResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                fullName: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
                city: { type: 'string' },
                stage: { type: 'string' },
                interest: { type: 'string' },
                message: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
              },
            },
          },
          pagination: {
            type: 'object',
            properties: {
              total: { type: 'integer', example: 42 },
              page: { type: 'integer', example: 1 },
              limit: { type: 'integer', example: 20 },
              pages: { type: 'integer', example: 3 },
            },
          },
        },
      },
      EventRegistrationInput: {
        type: 'object',
        required: ['eventId', 'eventTitle', 'fullName', 'email', 'phone', 'businessName', 'netWorth', 'cityDistrict', 'message', 'consent'],
        properties: {
          eventId: {
            type: 'string',
            example: 'expo-2027',
          },
          eventTitle: {
            type: 'string',
            example: 'Global Marathi Entrepreneurship Expo 2027',
          },
          fullName: {
            type: 'string',
            minLength: 2,
            maxLength: 100,
            example: 'Aakash More',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'aakash.more@example.com',
          },
          phone: {
            type: 'string',
            example: '9822012345',
          },
          businessName: {
            type: 'string',
            minLength: 2,
            maxLength: 150,
            example: 'Sahyadri Agro Solutions',
          },
          netWorth: {
            type: 'string',
            maxLength: 100,
            example: '₹100+ Cr',
          },
          cityDistrict: {
            type: 'string',
            example: 'Pune',
          },
          message: {
            type: 'string',
            minLength: 10,
            maxLength: 2000,
            example: 'Manufacturer of drip irrigation systems looking to expand dealer network and connect with corporate mentors.',
          },
          consent: {
            type: 'boolean',
            example: true,
          },
        },
      },
      EventRegistrationSuccessResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: {
            type: 'string',
            example: 'Registration confirmed for Global Marathi Entrepreneurship Expo 2027.',
          },
          data: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '6ac4ffdedea64b14a8800694' },
              eventId: { type: 'string', example: 'expo-2027' },
              fullName: { type: 'string', example: 'Aakash More' },
              createdAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
      EventRegistrationListResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                eventId: { type: 'string' },
                eventTitle: { type: 'string' },
                fullName: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
                cityDistrict: { type: 'string' },
                attendeeType: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
              },
            },
          },
          pagination: {
            type: 'object',
            properties: {
              total: { type: 'integer', example: 18 },
              page: { type: 'integer', example: 1 },
              limit: { type: 'integer', example: 20 },
              pages: { type: 'integer', example: 1 },
            },
          },
        },
      },
      ValidationErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Validation failed. Please correct the specified fields.' },
          errors: {
            type: 'object',
            additionalProperties: { type: 'string' },
            example: {
              email: 'Please provide a valid email address.',
              phone: 'Please enter a valid 10-digit mobile number.',
            },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'An error occurred processing your request.' },
        },
      },
    },
  },
};

export const swaggerUiOptions = {
  customSiteTitle: 'Mi Udyojak Honarach API Documentation',
  customCss: `
    .swagger-ui .topbar { background-color: #111827; border-bottom: 3px solid #E27500; }
    .swagger-ui .topbar .topbar-wrapper a { content: url('https://raw.githubusercontent.com/swagger-api/swagger-ui/master/dist/favicon-32x32.png'); }
    .swagger-ui .btn.execute { background-color: #E27500; border-color: #E27500; color: #fff; }
    .swagger-ui .btn.execute:hover { background-color: #c96700; border-color: #c96700; }
  `,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
  },
};
