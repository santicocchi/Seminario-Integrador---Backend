"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const permission_entity_1 = require("../entities/permission.entity");
let PermissionsService = class PermissionsService {
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async create(createPermissionDto) {
        const permission = this.permissionRepository.create(createPermissionDto);
        await this.permissionRepository.save(permission);
        return permission;
    }
    async findAll() {
        return this.permissionRepository.find();
    }
    async findOne(id) {
        return this.permissionRepository.findOneBy({ id });
    }
    async update(id, updatePermissionDto) {
        await this.permissionRepository.update(id, updatePermissionDto);
        return this.permissionRepository.findOneBy({ id });
    }
    async remove(id) {
        await this.permissionRepository.delete(id);
        return { deleted: true };
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map