package com.coeix.asocialmediabackend.service;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FilesStorageServiceImpl implements FilesStorageService {

	private final Path root = Paths.get("../asocialmedia-frontend/public/eventUserImg");

	private static boolean isDirEmpty(final Path directory) throws IOException {
		try (DirectoryStream<Path> dirStream = Files.newDirectoryStream(directory)) {
			return !dirStream.iterator().hasNext();
		}
	}

	@Override
	public void init() {
		
		File directory = new File(String.valueOf(root));

		if(!directory.exists()){
			
			try {
				Files.createDirectory(root);
			} catch (IOException e) {
				throw new RuntimeException("Could not initialize folder for upload!");
			}
		}

	}

	@Override
	public void save(MultipartFile file, String filename) {
		try {
			//Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
			Files.copy(file.getInputStream(), this.root.resolve(filename));
		} catch (Exception e) {
			throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
		}
	}
	
	@Override
	public Resource load(String filename) {
		try {
			Path file = root.resolve(filename);
			Resource resource = new UrlResource(file.toUri());

			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new RuntimeException("Could not read the file!");
			}
		} catch (MalformedURLException e) {
			throw new RuntimeException("Error: " + e.getMessage());
		}
	}

	@Override
	public void deleteAll() {
		// FileSystemUtils.deleteRecursively(root.toFile());
		try {
			FileSystemUtils.deleteRecursively(root);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Override
	public void delete(String filename) {
		
		try {
            Files.delete(root.resolve(filename));
        } catch (IOException e) {
            e.printStackTrace();
        }
	}

	@Override
	public Stream<Path> loadAll() {
		try {
			return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
		} catch (IOException e) {
			throw new RuntimeException("Could not load the files!");
		}
	}
}