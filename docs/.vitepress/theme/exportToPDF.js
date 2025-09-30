import { chromium } from 'playwright';

export async function exportTicketToPDF(ticketHtml, outputPath) {
  // 启动浏览器
  const browser = await chromium.launch();
  
  try {
    // 创建新页面
    const page = await browser.new_page();
    
    // 设置页面内容
    await page.set_content(ticketHtml, { wait_until: 'networkidle' });
    
    // 生成PDF
    await page.pdf({ 
      path: outputPath,
      format: 'A4',
      print_background: true
    });
    
    console.log(`PDF已保存到: ${outputPath}`);
  } catch (error) {
    console.error('生成PDF失败:', error);
  } finally {
    // 关闭浏览器
    await browser.close();
  }
}