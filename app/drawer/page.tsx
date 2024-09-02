import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { MenuIcon } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Button variant="ghost" size="icon" className="mr-4">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
        <h1 className="text-lg font-semibold">My Application</h1>
        <div className="ml-auto">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Drawer Title</DrawerTitle>
                <DrawerDescription>This is a drawer component from shadcn/ui.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <p className="text-sm text-muted-foreground">
                  This drawer can contain any content you want. You can add forms, lists, or any other components here.
                </p>
              </div>
              <DrawerFooter>
                <Button>Save changes</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </header>
      <main className="flex-1 py-6 px-4 lg:px-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to My Application</h2>
        <p className="mb-4">
          This is a sample page demonstrating how the drawer component integrates with page content.
          Click the "Open Drawer" button in the header to see the drawer in action.
        </p>
        <h3 className="text-xl font-semibold mb-2">Features</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Responsive design</li>
          <li>Drawer component from shadcn/ui</li>
          <li>Placeholder content</li>
          <li>Basic header with menu icon</li>
        </ul>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel
          consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.
          Sed euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt
          nisl nunc euismod nunc.
        </p>
        <Button>Learn More</Button>
      </main>
      <footer className="py-6 px-4 lg:px-6 border-t">
        <p className="text-center text-sm text-muted-foreground">
          © 2023 My Application. All rights reserved.
        </p>
      </footer>
    </div>
  )
}