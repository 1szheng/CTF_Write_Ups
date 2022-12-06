package mydecrypt;

import java.security.MessageDigest;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

class MyDecrypt {
    public static void main(String[] args) throws Exception {
        byte[] bArr = {-55, -98, 98, 14, -121, -110, 84, -3, 74, 10, 106, -27, -13, -112, -42, 111, -1, -89, -64, 46, -15, -108, -26, 59, -111, 113, 2, -69, -83, 45, -31, -103, 46, -84, -113, 116, -110, -36, 22, -23, 86, 38, -17, 0, 100, -65, 94, 48, 76, 17, 35, -117, -51, -81, -95, 49, 62, -28, 96, 86, 65, 76, 57, 40};
        String str = "this-issa-weird-key";

        byte[] bArr2 = new byte[16];
        System.arraycopy(bArr, 0, bArr2, 0, 16);
        IvParameterSpec ivParameterSpec = new IvParameterSpec(bArr2);
        int length = bArr.length - 16;
        byte[] bArr3 = new byte[length];
        System.arraycopy(bArr, 16, bArr3, 0, length);
        byte[] bArr4 = new byte[16];
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        messageDigest.update(str.getBytes());
        System.arraycopy(messageDigest.digest(), 0, bArr4, 0, 16);
        SecretKeySpec secretKeySpec = new SecretKeySpec(bArr4, "AES");
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(2, secretKeySpec, ivParameterSpec);
        System.out.println(new String(cipher.doFinal(bArr3)));
    }
}