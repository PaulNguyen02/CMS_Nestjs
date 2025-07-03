📁 src/
├── 📄 app.module.ts — Root application module
├── 📄 main.ts — Application entry point
├── 📁 common/ — Shared utilities and components
│ ├── 📁 cache/ — cache data
│ │ ├── 📄 cache.module.ts
│ ├── 📁 const/ — Constant
│ │ ├── 📄 app_module.const.ts
| | ├── 📄 upload-body.const.ts
│ │ └── 📄 upload-options.const.ts
│ ├── 📁 dto/ — Data Transfer Objects
│ │ ├── 📄 base.dto.ts
| | ├── 📄 get-base.dto.ts
│ │ └── 📄 pagination.dto.ts
│ ├── 📁 entities/ — Base entities
│ │ └── 📄 base.entity.ts
│ ├── 📁 enums/ — Enum error list
│ │ └── 📄 response-code.ts
│ ├── 📁 guards/ — Auth & role guards
│ │ └── 📄 jwt.startegy.ts
│ ├── 📁 responses/ — Data Response
│   └── 📄 api-response.ts
├── 📁 config/ — database configs 
│ └── 📄 typerom.config.ts
├── 📁 database/ — Database connection setup
├──── 📁 modules
│ └── 📄 database.module.ts
├── 📁 modules/ — Feature modules
│ ├── 📁 categories/ 
│ │ ├── 📄 categrories.controller.ts
│ │ ├── 📄 categories.module.ts
│ │ ├── 📄 categories.service.ts
│ │ ├── 📄 categories.service.interface.ts
│ │ ├── 📁 dto/
│ │ │ ├── 📄 create-category.dto.ts
│ │ │ ├── 📄 update-category.dto.ts
│ │ │ └── 📄 get-category.dto.ts
│ └── 📁 entities/
│ │ └── 📄 category.entity.ts
│ └── 📁 contact-information/ 
│ | ├── 📄 contact-information.controller.ts
│ | ├── 📄 contact-information.module.ts
│ | ├── 📄 contact-information.service.ts
│ │ └── 📄 contact-information.service.interface.ts
│ ├── 📁 dto/
│ │ ├── 📄 create-information.dto.ts
│ │ ├── 📄 get-information.dto.ts
│ │ └── 📄 update-information.dto.ts
│ └── 📁 entities/
│ | └── 📄 contact-information.entity.ts
│ └── 📁 files/ 
│ | ├── 📄 files.controller.ts
│ | ├── 📄 files.module.ts
│ | ├── 📄 files.service.ts
│ │ └── 📄 file.service.interface.ts
│ ├── 📁 dto/
│ │ ├── 📄 create-file.dto.ts
│ │ ├── 📄 get-file.dto.ts
│ │ └── 📄 update-file.dto.ts
│ └── 📁 entities/
│ | └── 📄 files.entity.ts
│ └── 📁 follow-us/ 
│ | ├── 📄 follow-us.controller.ts
│ | ├── 📄 follow-us.module.ts
│ | ├── 📄 follow-us.service.ts
│ │ └── 📄 follow-us.service.interface.ts
│ ├── 📁 dto/
│ │ ├── 📄 create-followus.dto.ts
│ │ ├── 📄 get-followus.dto.ts
│ │ └── 📄 update-followus.dto.ts
│ └── 📁 entities/
│ | └── 📄 files.entity.ts
│ | └── 📄 files.entity.ts
│ └── 📁 members/ 
│ | ├── 📄 member.controller.ts
│ | ├── 📄 member.module.ts
│ | ├── 📄 member.service.ts
│ │ └── 📄 member.service.interface.ts
│ ├── 📁 dto/
│ │ ├── 📄 create-member.dto.ts
│ │ ├── 📄 get-member.dto.ts
│ │ └── 📄 update-member.dto.ts
│ └── 📁 entities/
│ | └── 📄 members.entity.ts
│ └── 📁 menu-group/ 
│ | ├── 📄 menu-group.controller.ts
│ | ├── 📄 menu-group.module.ts
│ | ├── 📄 menu-group.service.ts
│ │ └── 📄 menu-group.service.interface.ts
│ ├── 📁 dto/
│ │ ├── 📄 create-menugroup.dto.ts
│ │ ├── 📄 get-menugroup.dto.ts
│ │ └── 📄 update-menugroup.dto.ts
│ └── 📁 entities/
│ | └── 📄 menu-group.entity.ts
│ └── 📁 menu-items/ 
│ | ├── 📄 menu-items.controller.ts
│ | ├── 📄 menu-items.module.ts
│ | ├── 📄 menu-items.service.ts
│ │ └── 📄 menu-items.service.interface.ts
│ ├── 📁 dto/
│ │ ├── 📄 create-menuitem.dto.ts
│ │ ├── 📄 get-menuitem.dto.ts
│ │ └── 📄 update-menuitem.dto.ts
│ └── 📁 entities/
│ |  └── 📄 menu-item.entity.ts
│ └── 📁 messages/ 
│ | ├── 📄 messages.controller.ts
│ | ├── 📄 messages.module.ts
│ | ├── 📄 messages.service.ts
│ │ └── 📄 messages.service.interface.ts
│ ├── 📁 dto/
│ │ ├── 📄 create-message.dto.ts
│ │ └── 📄 get-message.dto.ts
│ └── 📁 entities/
│   └── 📄 message.entity.ts
│ └── 📁 partners/ 
│ | ├── 📄 partners.controller.ts
│ | ├── 📄 partners.module.ts
│ | ├── 📄 partners.service.ts
│ │ └── 📄 partners.service.interface.ts
│ ├── 📁 dto/
│ │ ├── 📄 create-partner.dto.ts
│ │ ├── 📄 get-partner.dto.ts
│ │ └── 📄 update-partner.dto.ts
│ └── 📁 entities/
│   └── 📄 partners.entity.ts
│ └── 📁 posts/ 
│ | ├── 📄 post.controller.ts
│ | ├── 📄 post.module.ts
│ | ├── 📄 post.service.ts
│ │ └── 📄 post.service.interface.ts
│ ├── 📁 dto/
│ │ ├── 📄 create-post.dto.ts
│ │ ├── 📄 get-post.dto.ts
│ │ └── 📄 update-post.dto.ts
│ └── 📁 entities/
│ | └── 📄 posts.entity.ts
│ └── 📁 related-post/ 
│ | ├── 📄 related-post.controller.ts
│ | ├── 📄 related-post.module.ts
│ | ├── 📄 related-post.service.ts
│ │ └── 📄 related-post.service.interface.ts
│ ├── 📁 dto/
│ │ ├── 📄 create-related-post.dto.ts
│ │ └── 📄 get-related-post.dto.ts
│ └── 📁 entities/
│ | └── 📄 related-posts.entity.ts
│ └── 📁 user-login/ 
│ | ├── 📄 user-login.controller.ts
│ | ├── 📄 user-login.module.ts
│ | ├── 📄 user-login.service.ts
│ │ └── 📄 user-login.service.interface.ts
│ ├── 📁 dto/
│ │ ├── 📄 create-userlogin.dto.ts
│ │ └── 📄 get-userlogin.dto.ts
│ └── 📁 entities/
│   └── 📄 user-login.entity.ts
│ └── 📁 working-history/ 
│ | ├── 📄 working-history.controller.ts
│ | ├── 📄 working-history.module.ts
│ | ├── 📄 working-history.service.ts
│ │ └── 📄 working-history.service.interface.ts
│ ├── 📁 dto/
│ │ ├── 📄 create-workinghistory.dto.ts
│ │ ├── 📄 update-workinghistory.dto.ts
│ │ └── 📄 get-workinghistory.dto.ts
│ └── 📁 entities/
    └── 📄 working-history.entity.ts

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