# DOcument Guide

## Before code

1. Nodejs 16+
2. Yarn
3. Enable tsLint, prettier in your edior. (Notice setting prettier file path refer to <b>.prettierrc</b>)

## Techstack

- next 13 page router
- antd v5
- redux
- react-query
- tailwind-css

## Run

- install lib: `npm install`
- start dev: `npm dev`
- format code : `npm format`
- check lint : `npm lint`

## Tổ chức code :

- pages : trang web
- shared :
  - components :
    - business : các component theo nghiệp vụ
    - common : các component dùng chung
    - core : các component như table , form (lúc đầu định build nhưng vì thời gian nên dùng của antd)
    - icons : icon export từ figma về thành file svg
    - layout : Page Layout
  - hooks : các custom hook , còn lại sử dụng từ thư viện use-hook
  - mocks : để mockup dữ liệu sử dụng json-server
  - schema:
    - models : định nghĩa type các đối tượng, và các service (api call)
    - typeDef : Kiểu dữ liệu cơ sở
  - stores: quản lý state
  - utils:
    - contants : hằng số
    - functions : hàm tiện ích
- styles : các file style
- public :
  - locales : đa ngôn ngữ