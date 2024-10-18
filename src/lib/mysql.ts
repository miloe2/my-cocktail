import mysql from 'mysql2/promise';

// 환경 변수에서 MySQL URI 가져오기
const connection = mysql.createPool(process.env.MYSQL_URI || '');

// 연결 오류 처리
if (!process.env.MYSQL_URI) {
  throw new Error('MYSQL_URI 환경 변수가 설정되지 않았습니다.');
}

export default connection;
