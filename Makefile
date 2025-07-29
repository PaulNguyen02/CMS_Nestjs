.PHONY: all build push

all: build push

build:
	@echo "Ngày hôm nay trời trong xanh..."
	@echo "Đẹp như tranh"
	@echo "Thiên lý ơi"
	@echo "Anh muốn nói với em nghe"
	@echo "Rằng anh yêu em nhiều lắm"
	npm run build
	@echo "Building Docker image..."
	docker build . -t phuonglk/company-api:latest --platform linux/amd64
	@echo "Build completed! 🎵"

push:
	@echo "Pushing to registry..."
	@echo "Thiên lý ơi"
	docker push phuonglk/company-api:latest
	@echo "Em có thể ở lại đây được không"
	@echo "Dù cho mai này xa cách"
	@echo "Anh vẫn nhớ mãi không quên"
	@echo "Push completed! 🚀"