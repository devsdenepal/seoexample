import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-static';

export async function GET() {
  const jsonDirectory = path.join(process.cwd(), 'src', 'data');
  const fileContents = await fs.promises.readFile(jsonDirectory + '/news.json', 'utf8');
  const data = JSON.parse(fileContents);

  return NextResponse.json(data);
}
