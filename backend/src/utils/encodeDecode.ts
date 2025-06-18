export const encodePayload = (data: any) => {
  const jsonString = JSON.stringify(data);
  return Buffer.from(jsonString).toString('base64');
}

export const decodePayload = (data: any) => {
  const decodedJsonString = Buffer.from(data, 'base64').toString('utf-8');
  return JSON.parse(decodedJsonString);
}