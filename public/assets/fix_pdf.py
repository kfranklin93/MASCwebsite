import fitz  # PyMuPDF

def adjust_pdf_margins(input_path, output_path):
    # Constants (72 points = 1 inch)
    TOP_BOTTOM_MARGIN = 72.0  # 1 inch
    LEFT_RIGHT_MARGIN = 54.0   # 0.75 inch (0.75 * 72)

    # Open the source PDF
    src = fitz.open(input_path)
    doc = fitz.open()  # Create a new PDF

    for page in src:
        # Original page dimensions
        src_rect = page.rect
        width = src_rect.width
        height = src_rect.height

        # Calculate the target area for content
        target_width = width - (2 * LEFT_RIGHT_MARGIN)
        target_height = height - (2 * TOP_BOTTOM_MARGIN)

        # Create a new page with the same dimensions
        new_page = doc.new_page(width=width, height=height)

        # Define where the content should go (the "Safe Zone")
        # Rect(x0, y0, x1, y1)
        target_rect = fitz.Rect(
            LEFT_RIGHT_MARGIN, 
            TOP_BOTTOM_MARGIN, 
            width - LEFT_RIGHT_MARGIN, 
            height - TOP_BOTTOM_MARGIN
        )

        # Use show_pdf_page to place the source page into the target rect
        # This automatically scales the content to fit the margins
        new_page.show_pdf_page(target_rect, src, page.number)

    # Save the result
    doc.save(output_path)
    doc.close()
    src.close()
    print(f"Success! Saved to: {output_path}")

# Usage
if __name__ == "__main__":
	adjust_pdf_margins("Employee Application.pdf", "Employee_Application_Fixed.pdf")
