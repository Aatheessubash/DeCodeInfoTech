type Fields = Record<string, string>;

export class ValidationError extends Error {}

function readFields(body: unknown, required: string[], optional: string[]): Fields {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new ValidationError('A JSON object is required.');
  }
  const input = body as Record<string, unknown>;
  const fields: Fields = {};
  for (const key of [...required, ...optional]) {
    const value = input[key];
    if (value === undefined && optional.includes(key)) {
      fields[key] = '';
      continue;
    }
    if (typeof value !== 'string' || value.length > 10000) {
      throw new ValidationError(`Invalid ${key}.`);
    }
    fields[key] = value.trim();
    if (required.includes(key) && !fields[key]) {
      throw new ValidationError(`${key} is required.`);
    }
  }
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email)) {
    throw new ValidationError('A valid email address is required.');
  }
  return fields;
}

export function parseContact(body: unknown) {
  const fields = readFields(body, ['name', 'email', 'message'], ['company', 'projectType']);
  return {
    name: fields.name,
    email: fields.email,
    company: fields.company,
    projectType: fields.projectType || 'General enquiry',
    message: fields.message,
  };
}

export function parseCareer(body: unknown) {
  const fields = readFields(
    body,
    ['name', 'email', 'portfolio'],
    ['phone', 'experience', 'coverLetter', 'jobTitle'],
  );
  try {
    const url = new URL(fields.portfolio);
    if (!['https:', 'http:'].includes(url.protocol)) throw new Error();
  } catch {
    throw new ValidationError('Portfolio must be an HTTP or HTTPS URL.');
  }
  return {
    name: fields.name,
    email: fields.email,
    portfolio: fields.portfolio,
    phone: fields.phone,
    experience: fields.experience,
    coverLetter: fields.coverLetter,
    jobTitle: fields.jobTitle || 'General Application',
  };
}

/** A submission succeeds only after the delivery service accepts it. */
export async function handleSubmission<T>(
  request: Request,
  parse: (body: unknown) => T,
  deliver: (payload: T) => Promise<unknown>,
) {
  let payload: T;
  try {
    payload = parse(await request.json());
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error instanceof ValidationError ? error.message : 'Invalid JSON body.',
      },
      { status: 400 },
    );
  }
  try {
    await deliver(payload);
    return Response.json({ success: true, message: 'Submitted successfully.' });
  } catch {
    return Response.json(
      { success: false, message: 'Unable to send your submission. Please try again later.' },
      { status: 503 },
    );
  }
}
