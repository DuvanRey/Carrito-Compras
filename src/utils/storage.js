import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { v4  } from 'uuid';
import { config } from "../config/config.js";


export const uploadFile = async (file, ruta) => {
    try {
		const bucketName = config.aws.bucket;
		const clientConfig = {
			region: config.aws.defaultRegion,
			credentials: {
				accessKeyId: config.aws.accesKeyId,
				secretAccessKey: config.aws.secretAccesKey,
			},
		};
		const fileName = `${ruta}/${v4()}.${file.name.split('.').pop()}`;
		const s3Client = new S3Client(clientConfig);
		const uploadParams = {
			Bucket: bucketName,
			Key: fileName,
			Body: file.data,
			ContentType: file.mimetype,
		};
		const command = new PutObjectCommand(uploadParams);
		await s3Client.send(command);
		const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
		return { 'url': fileUrl, 'ruta': fileName, 'estado': true };

	} catch (error) {
		console.log("🚀 ~ uploadFile ~ error:", error)
		return { 'url': null, 'ruta': null, 'estado': false };
	}
}



