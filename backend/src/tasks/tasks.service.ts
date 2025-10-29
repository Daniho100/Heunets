import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';
import { Task, TaskDocument } from './schemas/tasks.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(dto: CreateTaskDto, userId: string): Promise<Task> {
    const newTask = new this.taskModel({ ...dto, owner: userId });
    return newTask.save();
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel.find({ owner: userId }).exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async findByProject(projectId: string): Promise<Task[]> {
  return this.taskModel.find({ projectId }).exec();
}

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const updated = await this.taskModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Task not found');
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
  const result = await this.taskModel.findByIdAndDelete(id).exec();
  if (!result) throw new NotFoundException('Task not found');
  return { message: 'Task deleted successfully' };
}
}
