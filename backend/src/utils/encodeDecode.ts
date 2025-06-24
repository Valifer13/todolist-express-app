/**
 * Encode payload to base64.
 * @param data - Payload Object.
 * @returns Base64 encoded object.
*/
export const encodePayload = (data: any) => {
  const jsonString = JSON.stringify(data);
  return Buffer.from(jsonString).toString('base64');
}

/**
 * Decode base64 to json object.
 * @param data - Base64 encoded.
 * @returns Object decoded from base64.
 */
export const decodePayload = (data: any) => {
  const decodedJsonString = Buffer.from(data, 'base64').toString('utf-8');
  return JSON.parse(decodedJsonString);
}