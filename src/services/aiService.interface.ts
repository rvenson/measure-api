interface AiService {
  readImage(base64Image : string) : Promise<number>;
}

export default AiService;