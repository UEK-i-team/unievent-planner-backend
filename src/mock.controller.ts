import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class MockController {

  @Get("/string")
  @ApiOperation({ summary: 'Get a string' })
  @ApiResponse({ status: 200, description: 'Returns a test string.', type: String })
  getHello(): string {
    return "test";
  }

  @Get("/number")
  @ApiOperation({ summary: 'Get a number' })
  @ApiResponse({ status: 200, description: 'Returns the number 0.', type: Number })
  getInt(): number {
    return 0;
  }

  @Get("/number/:number")
  @ApiOperation({ summary: 'Get a number by parameter' })
  @ApiParam({ name: 'number', type: Number, description: 'The number to return' })
  @ApiResponse({ status: 200, description: 'Returns the number from the parameter.', type: Number })
  getOneNumber(@Param('number') number: string): number {
    return Number(number);
  }

  @Get("/boolean")
  @ApiOperation({ summary: 'Get a boolean' })
  @ApiResponse({ status: 200, description: 'Returns true.', type: Boolean })
  getBoolean(): boolean {
    return true;
  }
}
