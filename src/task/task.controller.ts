import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ListTaskDto } from './dto/list-task.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Status } from './enums/status.enum';
import { Priority } from './enums/priority.enum';

@Controller('api/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    schema: {
      example: {
        name: "Complete Project",
        details: "Finish the NestJS project implementation",
        status: Status.PENDING,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        priority: Priority.HIGH
      }
    }
  })
  create(
    @Body( new ValidationPipe()) createTaskDto: CreateTaskDto
  ) {
    return this.taskService.create(createTaskDto);
  }

  @Post("/filter")
  findAll(
    @Query("page")  page: string,
    @Query("pageSize") pageSize: string,
    @Body(
      new ValidationPipe()) filters: ListTaskDto
    ) {
    return this.taskService.findAll( parseInt(page), parseInt(pageSize), filters);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Task By ID' })
  @ApiResponse({ status: 201, description: 'Task has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    schema: {
      example: {
        name: "Complete Task",
        details: "Finish the implementation",
        status: Status.IN_PROGRESS,
        priority: Priority.MEDIUM
      }
    }
  })
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.taskService.remove(+id);
  }
}
