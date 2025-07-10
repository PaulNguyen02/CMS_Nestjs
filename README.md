Các thư viện hỗ trợ
npm
init
swagger
jwt
class validator
type orm
eslint
slugify

Dò code thừa 
npx eslint .

Tạo file migration 
  npm run migration:create --name=initial         khi chưa có entity 
  npm run migration:generate --name=initial       khi có entity
Chạy migration 
  npm run migration:run

Xóa migration
  npm run migration:revert

Lỗi ko thể đăng nhập vs user='sa' là chưa có db trong Sqlserver

Nên để hàm get-dto chứa những thuộc tính cơ bản hoặc thuộc tính mảng
Hàm pos-dto chứa thuộc tính khóa

https://localhost:3001/